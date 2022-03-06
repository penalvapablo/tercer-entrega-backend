import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/products';

let productId;

async function pruebasAxios() {
  pruebaAxiosListar()
  await pruebaAxiosCrear();
  await pruebaAxiosActualizar();
  pruebaAxiosBorrar()
}

async function pruebaAxiosListar() {
  try {
    const res = await axios.get('/list');
    if (Array.isArray(res.data.products)) {
      console.log('Se pudieron leer los productos');
    } else {
      console.log('No se pudieron leer los productos');
    }
  } catch (error) {
    console.log('no se pudieron listar los productos', error.message);
  }
}

async function pruebaAxiosCrear() {
  try {
    const res = await axios.post('/create', {
      name: 'axios',
      description: 'axios',
      code: 'asd',
      img: 'asd',
      price: 115,
      stock: 5,
    });
    const { name, description, code, img, price, stock, _id } =
      res.data.product;
    if (name && description && code && img && price && stock && _id) {
      productId = _id;
      console.log('Se pudo crear un producto');
    } else {
      console.error('No se pudo crear un producto', error.message);
    }
  } catch (error) {
    console.error('No se pudo crear un producto!', error.message);
  }
}

async function pruebaAxiosActualizar() {
  try {
    const res = await axios.put(`/update/${productId}`, {
      name: 'UpdatedAxios',
      description: 'axios',
      code: 'asd',
      img: 'asd',
      price: 115,
      stock: 5,
    });
    const { name, description, code, img, price, stock, _id } =
      res.data.product;
    if (name && description && code && img && price && stock && _id) {
      productId = _id;
      console.log('Se pudo modificar un producto');
    } else {
      console.error('No se pudo modificar un producto', error.response);
    }
  } catch (error) {
    console.error('No se pudo modificar un producto', error.message);
  }
}

async function pruebaAxiosBorrar() {
  try {
    const res = await axios.delete(`/delete/${productId}`);
    const { name, description, code, img, price, stock, _id } =
    res.data.product;
    if (name && description && code && img && price && stock && _id) {
      console.log('Se pudo borrar un producto');
    } else {
      console.error('No se pudo borrar un producto', error.response);
    }
  } catch (error) {
    console.error('No se pudo borrar un producto', error.message);
  }
}

pruebasAxios()