function DefaultPropcompo(e) {
    return ( 
  <>
     <h1>This is {e.name}</h1>
     <li style={{textDecoration:'none'}}>{e.age===10?"eligible":'not eligible'} </li>  
     {/* <li style={e.age !== 10 ? { textDecoration: 'none' } : {}}>
  {e.age === 10 ? "eligible" : 'not eligible'}
</li> */}
  </>

     );
}


DefaultPropcompo.defaultProps={
    name:"defaultProps",
    age:9
};

export default DefaultPropcompo;
