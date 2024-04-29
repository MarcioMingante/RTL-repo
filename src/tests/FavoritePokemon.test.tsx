import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('', () => {});

describe('Testando o componente FavoritePokemon', () => {
  test('Testa se é exibida na tela a mensagem "No favorite pokemon found" caso a pesoa não tenha favoritado nenhum pokemon', () => {
    renderWithRouter(<FavoritePokemon />);

    const msg = screen.getByText('No favorite Pokémon found');

    expect(msg).toBeInTheDocument();
  });

  test('Testa se são exibidos os pokemons favoritados', async () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    await userEvent.click(favoriteButton);

    const favoritePage = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await userEvent.click(favoritePage);

    const addedPokemon = screen.getByTestId('pokemon-name');

    expect(addedPokemon).toBeInTheDocument();
    expect(addedPokemon).toHaveTextContent('Pikachu');
  });
});
