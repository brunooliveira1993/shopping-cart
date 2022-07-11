require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {});
  it('testa se a fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('testa se ao ser chamada com argumento computador fetch é chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Teste se, ao chamar a função fetchProductscom o argumento computador, a função fetchutiliza o endpoint correto', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('Teste se o retorno da função fetchProductscom o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch)
  })

  it('Teste se, ao chamar a função fetchProductssem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
  // fail('Teste vazio');


