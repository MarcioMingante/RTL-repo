import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('', () => {});

describe('Testando o componente Pokemon', () => {
  test('Testa se é renderizado um card com as informações de determinado pokemon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o card contém um link para exibir detalhes desse pokemon', async () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();

    await userEvent.click(detailsLink);

    expect(global.location.pathname).toBe('/pokemon/25');
  });

  test('Testa se existe um icone de estrela nos pokemons favoritados', async () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(detailsLink);
    const favoriteBtn = screen.getByLabelText('Pokémon favoritado?');
    await userEvent.click(favoriteBtn);
    const homeBtn = screen.getByRole('link', { name: 'Home' });
    await userEvent.click(homeBtn);

    const starImage = screen.getByAltText('Pikachu is marked as favorite');

    expect(starImage).toHaveAttribute('src', '/star-icon.png');
    expect(starImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
