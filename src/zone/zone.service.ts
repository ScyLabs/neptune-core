import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ParentTypeSchema } from 'src/common/types/parent-type';
import { CreateZoneInput, UpdateZoneInput } from './inputs/zone.input';
import { Zone } from './zone.model';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private readonly zoneModel) {}

  getZones(ids: string[]) {
    return this.zoneModel.find({
      _id: ids,
    });
  }

  async getZone(_id: string) {
    return this.zoneModel.findOne({
      _id,
    });
  }

  async createZone(input: CreateZoneInput) {
    const { parentType, parent, ...rest } = input;

    const model = mongoose.model(parentType, ParentTypeSchema[parentType]);

    const parentObject: any = await await model
      .findOne({
        _id: parent,
      })
      .exec();
    if (!parentObject) throw new NotFoundException('Parent not found');
    else if (parentObject.details === undefined)
      throw new Error("Parent don't have details");

    const lastZoneOfParent = await this.zoneModel.findOne(
      {
        parent,
      },
      null,
      {
        sort: {
          prio: 'desc',
        },
      },
    );

    const zone = await this.zoneModel.create({
      ...rest,
      parent,
      prio: !lastZoneOfParent ? 0 : lastZoneOfParent.prio + 1,
    });

    await model.updateOne(
      {
        _id: parentObject._id,
      },
      {
        $push: {
          zones: zone._id,
        },
      },
    );

    return zone;
  }

  async updateZone(_id: string, input: UpdateZoneInput) {
    const page = await this.getZone(_id);
    if (!page) throw new NotFoundException('Page not found');
    await this.zoneModel.updateOne(
      {
        _id,
      },
      {
        $set: input,
      },
    );
    return this.zoneModel.findOne({
      _id,
    });
  }
}
