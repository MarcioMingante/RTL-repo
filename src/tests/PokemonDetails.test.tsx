import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('', () => {});

describe('Testando o componente PokemonDetails', () => {
  test('Testa se as informações detalhadas do pokemon são mostradas na tela', async () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(detailsBtn);

    const pokemonName = screen.getByText('Pikachu Details');
    expect(pokemonName).toBeInTheDocument();

    expect(detailsBtn).not.toBeVisible();

    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const pokemonDetails = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do pokemon', async () => {
    renderWithRouter(<App />);
    const altText = 'Pikachu location';

    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(detailsBtn);

    const locations = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(locations).toBeInTheDocument();

    const allLocations = screen.queryAllByAltText(altText);
    expect(allLocations).toHaveLength(2);
    expect(allLocations[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(allLocations[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(allLocations[0]).toHaveAttribute('alt', altText);
    expect(allLocations[1]).toHaveAttribute('alt', altText);
  });

  test('Testa se o usuário pode favoritar um pokemon por meio da página de detalhes', async () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(detailsBtn);

    const favoriteBtn = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteBtn).toBeInTheDocument();

    await userEvent.click(favoriteBtn);
    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    await userEvent.click(favoriteBtn);
    expect(favoriteStar).not.toBeInTheDocument();

    const labelText = screen.getByText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });
});
