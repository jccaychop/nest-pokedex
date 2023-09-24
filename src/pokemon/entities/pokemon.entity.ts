import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // id: string  Mongo me lo da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// mi Schema se va a basar en la clase Pokemon
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

/*
 * Las entidades hacen una relacion con la BD
 *
 * index:true, al estar indexados, la busqueda es mas rapida
 */
