import './App.css';
import Greet from './component/Function';
// import Form from './component/form';
import Prop from './component/Props/props';
// import defaultPropcompo from './component/Props/defaultpropcompo';
import DefaultPropcompo from './component/Props/defaultProp';
import ChildProps from './component/Props/childProps';
import Form from './component/Regexform';
function App() {
  return (
    <div className="App">
      {/* <Greet /> */}
      {/* <Form />  */}
      {/* <Prop name="Props type"/> */}
      {/* <DefaultPropcompo/>
      <ChildProps>
      <p>Hi Everyone</p>
      <p>Hi Everyone</p>
      </ChildProps> */}
      <Form/>
    </div>
  );
}

export default App;
