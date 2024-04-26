import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('', () => {});

describe('Testando o componente App', () => {
  test('Testa se o topo da aplicação tem um conjunto de links', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Testa se a  aplicação é redirecionada para a página inicial ao clicar no link "Home"', async () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    await userEvent.click(home);

    expect(global.location.pathname).toBe('/');
  });

  test('Testa se a  aplicação é redirecionada para a página About ao clicar no link "About"', async () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /about/i });
    await userEvent.click(about);

    expect(global.location.pathname).toBe('/about');
  });

  test('Testa se a  aplicação é redirecionada para a página de Pokémon Favorito ao clicar no link "Favorite Pokémon"', async () => {
    renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await userEvent.click(favorite);

    expect(global.location.pathname).toBe('/favorites');
  });

  test('Testa se a aplicação é redirecionada para a página de Not Found ao entrar em uma url desconheido', () => {
    renderWithRouter(<App />, { route: '/urldesconhecida' });

    const notFoundMsg = screen.getByText('Page requested not found');

    expect(notFoundMsg).toBeInTheDocument();
  });
});
