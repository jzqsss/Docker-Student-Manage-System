





import { Component, ReactNode } from 'react';
import { AppState } from './AppState';
import { LabClient } from './utils/LabClient';

export class App extends Component<any,AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            value: "ls",
        };
    }

    render(): ReactNode {
        return (
            <div>
                <button 
                    onClick={async () => {let res=await LabClient.ls("student1_lab1");
                    this.setState({value: res.out})                  
                }}
                >
                    {this.state.value}
                </button>
            </div>
        );
    }
}