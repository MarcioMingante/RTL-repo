import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('', () => {});

describe('Testando o componente NotFound', () => {
  test('Testa se a página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundMsg = screen.getByRole('heading', { name: /page requested not found/i });

    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Testa se a página mostra a imagem com o texto alternativo "Clefairy pushing buttons randomly with text I have no idea what i\'m doing"', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText('Clefairy pushing buttons randomly with text I have no idea what i\'m doing');

    expect(image).toBeInTheDocument();
  });
});
