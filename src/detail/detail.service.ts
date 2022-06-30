import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ParentType, ParentTypeSchema } from 'src/common/types/parent-type';
import { PageSchema } from 'src/page/page.model';
import { Detail } from './detail.model';
import { CreateDetailInput } from './inputs/detail.input';

@Injectable()
export class DetailService {
  constructor(@InjectModel(Detail.name) private readonly detailModel) {
    mongoose.connect(process.env.MONGO_URI);
  }
  async createDetail(input: CreateDetailInput) {
    const { parentType, parent, ...rest }: any = input;

    const model = mongoose.model(parentType, ParentTypeSchema[parentType]);

    const parentObject: any = await await model
      .findOne({
        _id: parent,
      })
      .exec();
    if (!parentObject) throw new NotFoundException('Parent not found');
    else if (parentObject.details === undefined)
      throw new Error("Parent don't have details");

    const existingDetail = await this.detailModel.findOne({
      _id: parentObject.details,
      lang: rest.lang,
    });
    if (existingDetail) {
      throw new BadRequestException(
        `Detail already exist on "${rest.lang}" lang to this parent`,
      );
    }

    const detail = await this.detailModel.create(rest);

    await model.updateOne(
      {
        _id: parent,
      },
      {
        $push: {
          details: detail._id,
        },
      },
    );
    return detail;
  }
}
