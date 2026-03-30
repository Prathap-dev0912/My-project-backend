import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type productDocument = product & Document;
@Schema({ timestamps: true })
export class product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  mobile: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  userId: string;
}
export const productSchema = SchemaFactory.createForClass(product);
