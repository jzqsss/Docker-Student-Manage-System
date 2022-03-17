





import { Component, ReactNode } from 'react';

import { AppState } from './AppState';
import { LabClient } from './utils/LabClient';

export class App extends Component<any, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render(): ReactNode {
        return (
            <div>
                <button onclick={async () => {
                    await LabClient.ls("lab1");
                }}/>
            </div>
        );
    }
}