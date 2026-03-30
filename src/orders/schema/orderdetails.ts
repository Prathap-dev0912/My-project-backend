import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document;
@Schema({ timestamps: true })
export class Order {

    @Prop({required: true})
    propertyname: string;

    @Prop({required: true})
    tokens: number;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    status: string;

    @Prop({required: true})
    currency: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    code: string;
}
export const orderSchema = SchemaFactory.createForClass(Order);