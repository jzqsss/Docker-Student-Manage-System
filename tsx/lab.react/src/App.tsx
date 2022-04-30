





import { Component, ReactNode } from 'react';
import { AppState } from './AppState';
import { LabClient } from './utils/LabClient';
// Routing
import PrivateRoute from "./components/routing/PrivateRoute";


// Screens
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/screens/LoginScreen";
import ContainerScreen from "./components/screens/ContainerScreen";
import PrivateScreen from "./components/screens/PrivateScreen";
import InputScreen from "./components/screens/InputScreen";
const App = () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <PrivateRoute exact path="/" component={PrivateScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/input" component={InputScreen} />
                    <Route exact path="/container" component={ContainerScreen} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

// export class App extends Component<any,AppState> {  
//     constructor(props: any) {
//         super(props);

//         this.state = {
//             value: "ls",
//         };
//     }

//     render(): ReactNode {
//         return (
//             <div>
//                 <button 
//                     onClick={async () => {let res=await LabClient.ls("student1_lab1");
//                     this.setState({value: res.out})                  
//                 }}
//                 >
//                     {this.state.value}
//                 </button>
//             </div>
//         );
//     }
// }