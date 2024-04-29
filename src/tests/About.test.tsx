import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('', () => {});

describe('Testando componente About', () => {
  test('Testa se a página contém as informações sobre a pokédex', () => {
    renderWithRouter(<About />);

    const about = screen.getByText('What does this app do?');

    expect(about).toBeInTheDocument();
  });

  test('Testa se a página contém um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutHeader = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(aboutHeader).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.');
    const secondParagraph = screen.getByText('One can filter Pokémon by type, and see more details for each one of them.');

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Testa se a página contém a imagemd e uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
