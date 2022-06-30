import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreatePageInput, UpdatePageInput } from './inputs/page.input';
import { Page } from './page.model';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private readonly pageModel) {
    mongoose.connect(process.env.MONGO_URI);
  }

  getPages() {
    return this.pageModel.find();
  }

  async getPage(_id: string) {
    return this.pageModel.findOne({
      _id,
    });
  }
  async createPage(input: CreatePageInput) {
    const { parent: parentId, ...rest } = input;
    const parentObject = await this.pageModel.findOne({
      _id: parentId,
    });
    let parent = null;
    if (parentId !== null && !parentObject) {
      throw new NotFoundException('Parent not found');
    }
    if (parentObject) {
      parent = parentObject._id;
    }

    const lastPageOfParent = await this.pageModel.findOne(
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

    const newPage = await this.pageModel.create({
      ...rest,
      parent,
      prio: !lastPageOfParent ? 0 : lastPageOfParent.prio + 1,
    });
    if (parentObject) {
      await this.addChild(parentObject, newPage);
    }
    return newPage;
  }

  async updatePage(_id: string, input: UpdatePageInput) {
    const page = await this.getPage(_id);
    if (!page) throw new NotFoundException('Page not found');
    await this.pageModel.updateOne(
      {
        _id,
      },
      {
        $set: input,
      },
    );
    return this.pageModel.findOne({
      _id,
    });
  }
  private async addChild(parent: Page, child: Page) {
    return this.pageModel.updateOne(
      {
        _id: parent._id,
      },
      {
        $push: {
          childs: child._id,
        },
      },
    );
  }
}
