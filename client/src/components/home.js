import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import {
  Grid,
  Menu,
  Segment,
  Card,
  Image,
  Pagination,
  Button,
} from "semantic-ui-react";
import portada from "../imagenes/portada.jpg";
import axios from 'axios';
import {getCategories} from '../redux/actions/category';
import {getProducts,getProductCategory} from '../redux/actions/productList';
import store from '../redux/store/index';
import { useDispatch,useSelector} from 'react-redux';

let id = localStorage.getItem('idUser');
function Home() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);  
  const [activeItem, setActiveItem] = useState("Todos Los Productos");
  /* const [productos, setProductos] = useState (store.getState); */
  const productos = useSelector(store => store.productList.data)
  const paginas = productos &&  Math.ceil(productos.length / 6); 
  const [productPage, setProductPage] = useState ([]);
  const categorias = useSelector(store => store.categorias.data)
  
    
  useEffect(() => {  
    dispatch(getCategories());
    dispatch(getProducts())
     
  },[])
  
  console.log(categorias)
  const handleItemClick = (e, { name }) => {
    let page = []; 
    setActiveItem(name);
    let url = '';
    if (name === 'Todos Los Productos') {
      dispatch(getProducts())
        
    } else {
      dispatch (getProductCategory(name));
      setActive(1);
    }
    
      for (let i = 0; i < productos.length; i += 6) {
        let seccion = productos.slice(i, i + 6);
        page.push(seccion)
      }
      setProductPage(page) 
  };
  const handleClick = (e, { activePage }) => {
    setActive(activePage);
  };
  return (
    <div className="home-Home">
      <Image src={portada} fluid />
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Link to="/products">
              <Menu.Item
                name="Todos Los Productos"
                active={activeItem === "Todos Los Productos"}
                onClick={handleItemClick}
              />
            </Link>
            {categorias && categorias.length>0 && categorias.map((categoria) => (
              <Link to={`/${categoria.name}`}>
                <Menu.Item key = {key++}
                  name={categoria.name}
                  active={activeItem === categoria.name}
                  onClick={handleItemClick}
                />
              </Link>
            ))}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            <div className="home-content">
              <div className="home-productos">
                <Card.Group>
                  {productPage.length > 0 && productPage[active - 1].map((producto) => (               
                    <Card key = {key++}>
                      <Card.Content>
                        <Image size="small" src={`http://localhost:3001/${producto.imagenes[0]}`} />
                        <Card.Header className="home-header">
                          {producto.name}
                        </Card.Header>
                        <Card.Meta>{producto.category}</Card.Meta>
                        <Card.Description>
                          {producto.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>                        
                        <div className="home-price">
                        <Link to={"/producto/" + producto.id}>
                          <Button inverted color="yellow">
                            Ver Producto
                          </Button>
                        </Link>
                          <Card.Header className="home-priceCard">
                            {`$ ${producto.price}`}
                          </Card.Header>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </div>
              <div className="home-paginacion">
                <Pagination key = {key++}
                  defaultActivePage={active}
                  onPageChange={handleClick}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={paginas}
                />
              </div>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Home;