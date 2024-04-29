import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('', () => {});

describe('Testando o componente Pokedex', () => {
  test('Testa se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const header = screen.getByRole('heading', { name: 'Encountered Pokémon' });

    expect(header).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokemon da lista ao clicar no botão "Próximo Pokémon"', async () => {
    renderWithRouter(<App />);

    const currentPokemon = screen.getByTestId('pokemon-name');
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nextPokemonBtn).toBeInTheDocument();

    await userEvent.click(nextPokemonBtn);
    expect(currentPokemon).toHaveTextContent('Charmander');

    await userEvent.click(nextPokemonBtn);
    expect(currentPokemon).toHaveTextContent('Caterpie');

    await userEvent.click(nextPokemonBtn);
    await userEvent.click(nextPokemonBtn);
    await userEvent.click(nextPokemonBtn);
    await userEvent.click(nextPokemonBtn);
    await userEvent.click(nextPokemonBtn);
    await userEvent.click(nextPokemonBtn);

    await userEvent.click(nextPokemonBtn);
    expect(currentPokemon).toHaveTextContent('Pikachu');
  });

  test('Testa se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);

    const pokemons = screen.queryAllByTestId('pokemon-name');

    expect(pokemons).toHaveLength(1);
  });

  test('Testa se a pokedex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypes = screen.queryAllByTestId('pokemon-type-button');
    expect(pokemonTypes[0]).toHaveTextContent('Electric');
    expect(pokemonTypes[1]).toHaveTextContent('Fire');
    expect(pokemonTypes[2]).toHaveTextContent('Bug');
    expect(pokemonTypes[3]).toHaveTextContent('Poison');
    expect(pokemonTypes[4]).toHaveTextContent('Psychic');
    expect(pokemonTypes[5]).toHaveTextContent('Normal');
    expect(pokemonTypes[6]).toHaveTextContent('Dragon');

    expect(pokemonTypes).toHaveLength(7);
  });

  test('Testa se após selecionar um botão a pokedex circula somente pelos pokemons daquele tipo', async () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    const currentPokemon = screen.getByTestId('pokemon-name');
    expect(currentPokemon).toHaveTextContent('Pikachu');
    expect(allBtn).toBeVisible();

    const nextBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const fireBtn = screen.getByRole('button', { name: 'Fire' });

    await userEvent.click(fireBtn);
    expect(currentPokemon).toHaveTextContent('Charmander');
    expect(allBtn).toBeVisible();

    await userEvent.click(nextBtn);
    expect(currentPokemon).toHaveTextContent('Rapidash');
    expect(allBtn).toBeVisible();
  });

  test('Testa se a pokedex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);

    const currentPokemon = screen.getByTestId('pokemon-name');
    const resetBtn = screen.getByRole('button', { name: 'All' });
    expect(resetBtn).toBeVisible();

    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    await userEvent.click(fireBtn);
    expect(currentPokemon).toHaveTextContent('Charmander');

    await userEvent.click(resetBtn);
    expect(currentPokemon).toHaveTextContent('Pikachu');
  });
});
