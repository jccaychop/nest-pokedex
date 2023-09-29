import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    //! borramos toda la data, si es que existe
    //! delete * from pokemons
    await this.pokemonModel.deleteMany({});

    const pokemonToInsert: PokemonToInsert[] = [];

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({ no, name });
    });

    //* insercion multiple o por lotes
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}

interface PokemonToInsert {
  no: number;
  name: string;
}
