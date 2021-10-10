import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import {GitcoinProvider} from './store';
import {Pages} from './pages';
import {Initiate} from './network/api';
Initiate();
function App() {
    return (
        <GitcoinProvider>
            <Pages />
        </GitcoinProvider>
    );
}
export default App;
