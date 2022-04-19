import { NextPage } from 'next';
import { GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[]
}


const HomePage: NextPage<Props> = ({pokemons}) => {
  return (
    <Layout title={'Pokemons'}>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id} 
              pokemon={pokemon}
            />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await  pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: parseInt(pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')),
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
