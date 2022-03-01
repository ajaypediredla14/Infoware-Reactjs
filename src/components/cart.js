
import React,{useState,useEffect} from 'react';
import plus from './images/plus.png';
import minus from './images/minus.png';
import './cart.css';
import {Button,Modal,Row,Col} from 'react-bootstrap';

function Shoppingcart() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pizzaToppings, setPizzaToppings] = useState([]);
  var toppings=[
      {
        id:1,
        price: 12,
        name: "Red Pepper"
      },
      {
        id:2,
        price: 10,
        name: "Onion"
      },
      {
        id:3,
        price: 14,
        name: "Grilled Mushroom"
      },
      {
        id:4,
        price: 18,
        name: "Extra Cheese"
      },
      {
        id:5,
        price: 25,
        name: "Black Olive"
      }
  ]
  var items1=[
      {
          "id": 1,
          "title": "Margherita",
          "img": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg",
          "quantity": 1,
          "price": 239,
          "cprice":239,
          "sprice": 239,
          "top":0
      },
      {
        "id": 2,
        "title": "Double Cheese Margherita",
        "img": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pepperoni_pizza.jpg",
        "quantity": 1,
        "price": 375,
        "cprice":375,
        "sprice": 375,
        "top":0
    }
  ]
  const [total,setTotal]=useState(0);
  const [items,setItems]=useState(items1);
  useEffect(() => {
      let tot=0;
      items.map(item=>{
        tot+=item.price;
      })
      setTotal(tot); 
  }, [items])
  const [store,setStore]=useState();
  function storeid(item)
  {
    setStore(item);
    handleShow();
  }

  function pizzaTops()
  {
    handleClose();
    const toppingsParam = Object.keys(pizzaToppings)
    .filter(function(x){
        return pizzaToppings[x]!==false;
    });
    // console.log(toppingsParam[0]);
    var topuptotal=0;
    Object.keys(toppingsParam)
    .filter(function(x){
        const find = toppings.find(key=>key.name===toppingsParam[x]);
        topuptotal+=find.price;
    });
    store.top=store.quantity*topuptotal;
    store.price+=store.top;
    const newitems=[
    ...items,
    ];
    setItems(newitems);
    console.log(newitems);
  }
function increment(item)
{
    
    item.price+=(item.sprice+(item.top/item.quantity));
    item.quantity+=1;
    const newitems=[
    ...items,
    ];
    setItems(newitems);
}

function pizzaSize(val,item)
{
  // console.log(item);
  if(val=="S")
  {
    item.price=item.cprice*item.quantity;
    item.sprice=item.cprice;
    const newitems=[
    ...items,
    ];
    setItems(newitems);
    console.log(newitems);
  }
  else if(val=="M")
  {
    item.sprice=item.cprice*1.5;
    item.price=item.cprice*1.5*item.quantity;
    const newitems=[
    ...items,
    ];
    setItems(newitems);
    console.log(newitems);
  }else if(val=="L"){
    item.sprice=item.cprice*2;
    item.price=item.cprice*2*item.quantity;
    const newitems=[
    ...items,
    ];
    setItems(newitems);
    console.log(newitems);
  }
}

function decrement(item)
{
    if(item.quantity>=2){
    item.price-=(item.sprice+(item.top/item.quantity));
    item.quantity-=1;
    // console.log(item.cprice);
    const newitems=[
    ...items,
    ];
    setItems(newitems);
    }
    else {
        var index= items.indexOf(item);
        if(index!==-1)
        {
            items.splice(index,1);
            const newitems=[
                ...items,
            ];
            setItems(newitems);
        }
    }
}

let tops= toppings.length?(

        toppings.map(top=>{
            return (
                <li className="collection-item avatar" key={top.id}>
                    <input
                      key={top.id}
                      type="checkbox"
                      name={top.name}
                      value={top.name}
                      className="mt-2 mr-2"
                      onChange={(e) =>
                        setPizzaToppings({
                          ...pizzaToppings,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="toppings">{top.name}-{top.price}$</label>
                </li>
            )
        })
):(<p>No Toppings available</p>);

 let addeditems= items.length?(
     items.map(item=>{
         return (
         <li className="collection-item avatar" key={item.id}>
            <div className="item">
                <Row>
                <Col md={2} xl={2} sm={6}>
                <div className="image">
                <img src={item.img} alt="" />
                </div>
                </Col>
                <Col md={2} xl={2} sm={6}>
                <div className="description">
                <span>{item.title}</span>
                </div>
                </Col>
                <Col md={2} xl={2} sm={6}>
                <div className="description ">
                <select name='option' onClick={(e) => pizzaSize(e.target.value,item)} className="sort">
                    <option value="S" className="sort_option">Small</option>
                    <option value="M" className="sort_option">Medium</option>
                    <option value="L"className="sort_option">Large</option>
                </select>
                </div>
                </Col>
                <Col md={2} xl={3} sm={6}>
                <div className="quantity">
                <button className="plus-btn" type="button" name="button" onClick={()=>increment(item)}>
                    <img src={plus} alt="" />
                </button>
                <input type="text" name="name" value={item.quantity} readOnly="True"/>
                <button className="minus-btn" type="button" name="button" onClick={()=>decrement(item)}>
                    <img src={minus} alt="" />
                </button>
                </div>
                </Col>
                <Col md={2} xl={1} sm={6}>
                <Button className="toppings" variant="success" onClick={()=>storeid(item)}>Toppings</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Toppings</Modal.Title>
                    </Modal.Header>
                    <ul className="collection">
                        <h5>Choose Toppings:</h5>
                        {tops}
                    </ul>
                    <Modal.Footer>
                    <Button  className="toppings" variant="primary" onClick={()=>pizzaTops()}>
                        Done
                    </Button>
                    </Modal.Footer>
                </Modal>
                </Col>
                <Col md={2} xl={2} sm={6}>
                <div className="total-price">${item.price}</div>
                </Col>
                </Row>
            </div>
        </li> 
         )
     }) 
 ):(<h2>empty list</h2>)

  return (
    <div>
      <section className="relative bg-white min-h-screen">
        <div className="relative container pt-12 px-4 mb-20 mx-auto text-center">
          <h1 className="mt-1 mb-1 lg:mb-12 font-bold">
            Shopping Cart
          </h1>
          <hr style={{width: "35vh",height: "0.5vh",color : "blue",borderRadius: "100%",marginLeft: "40%"}}/>
           <ul className="collection">
           <div className="item d-none d-xl-block">
                <Row >
                  <Col xl={2} md={3} sm={6} >
                  <div className="description h1">
                  <span>Pizza</span>
                  </div>
                  </Col>
                  <Col xl={2} md={3} sm={6}>
                  <div className="description h1">
                <span>Name</span>
                </div>
                  </Col>
                  <Col xl={2} md={3} sm={6}>
                  <div className="description h1 ml-4">
                <span>Size</span>
                </div>
                  </Col>
                  <Col xl={2} md={3} sm={6}>
                  
                <div className="description h1 ml-12">
                <span>Quantity</span>
                </div>
                  </Col>
                  <Col xl={2} md={3} sm={6}>
                  <div className="description h1 ml-20">
                <span>Toppings</span>
                </div>
                  </Col>
                  <Col xl={2} md={3} sm={6}>
                  <div className="description h1 ml-20">
                <span>Prices</span>
                </div>
                  </Col>
                </Row>
            </div>
            <hr />
           {addeditems}
           <hr className="mt-10"/>
          </ul>
          <h2 className="mt-12">Total Amount to be Paid:  <span>${total}</span></h2>
        </div>
      </section>
    </div>
  );
}

export default Shoppingcart;