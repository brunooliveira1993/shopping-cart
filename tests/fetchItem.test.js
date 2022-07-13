require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('1 - Teste a função fetchProducts', () => {});
  it('testa se a fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('testa se ao ser chamada com argumento computador fetch é chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Teste se, ao chamar a função fetchProductscom o argumento computador, a função fetchutiliza o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchItem com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item)
  });

  it('Teste se, ao chamar a função fetchItem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
