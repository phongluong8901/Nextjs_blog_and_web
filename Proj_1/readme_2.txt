#1--- Docs


1.3-- reactjs
-- cai nodejs, npm

-- JSX javascrip + xml
JSX -> Babel -> JS: Babel - la trinh bien dich

-- dom - document object model
virtual dom: dom ao, ban aso cua dom that
khi dom thay doi -> render lai
react render ra giao dien -> luu trong virtual dom -> luu trong bo nho
-> khi thay doi -> virtual dom thay doi
-> react so sanh dom va virtual dom -> khac nhau -> render

-- import/export
components - tai su dung
import {AppComponent} from "./App"
<AppComponent />

import {App as AppComponent} from "./App"
<App />

import * as AppComponent from "./App"
<AppComponent.App />

-- Styling Css
.App {}
-> theo class

<div className="App" style={{color:"red"}}>

-- sass
Sass (Syntactically Awesome Style Sheets) là một CSS Preprocessor, giúp code CSS trở nên sạch sẽ, dễ quản lý và có tính logic hơn.
1. Sử dụng Biến (Variables)
2. Xếp lồng (Nesting)
3. Mixins (Tái sử dụng code)
4. Chia nhỏ file (Partials & Import)
5. Phép toán (Operations)

-- Prop and state
const count = 1
<card count={count}/>

fuction Card(props){
    const {count} = props
    
    return(
        <h1>{count}</h1>
    )
}

-- useState
const [count, setCount] = useState(1)
const handleIncrease = () => {
    setState(count + 1)
    //setState((prev) => prev + 1)
    console.log(count)
}

<button onClick={handleIncrease} >Increase</button>

khi thay doi value -> component re render lai

-- useRef
lay cac phan tu de xu ly event: de dung focus
neu dung useRef thay cho state -> khi thay doi value se k rerender lai (.current=true)

-- useEffect
//case 1
//chay vao callback sau khi component da render
const [count, setCount] = useState(1)
useEffect(() => {
    //callback
    console.log("chay vao callback")
    //cleanup function
    return () => {
        console.log("don dep")
    }
}, [count])

<button conClick={() => setCout(count +1)}>change</button>

render UI -> chay vao useEffect
khi render lan 1 chua don dep, nhung khi render lan 2 -> don dep roi moi chay vao callback
neu them [] -> chi chay vao lan dau tien, cac lan khac se k chay vao
neu them [count] -> neu count thay doi o lan thu 2 -> cleanup -> callback

-- useMemo
// khong bi re render lai, chi tinh toan lai khi thay doi course
//toi uu perfomance
const course = [
    {name: "javascript", score: 10},
    {name: "html", score: 20},
    {name: "css", score: 30}
]

const [count, setCount] = useState(1)
const totalCourse = useMemo(() => {
    course.reduce((total, cuccrent) => {
    return total += current.score
}, 0)
}, [course])

<button onClick={() => setCount(count +1)}>Change</button>

-- memo
khi re-render se bi cap nhat lai content
-> neu chi muoon doi input, giux nguyen Content (vi count khong thay doi -> neu khong thay doi count ma Content bi re-render -> du thua) ->
-> memo(Content)

-- useCallback
handleIncrease khi cai nay bi re-render lai -> bug -> Content bi rerender lai du count k doi
-> dua fucntion ra ngoai ham hoac them useCallback -> k bi re-render lai
const handleIncrease = useCallback(
    () => {
    setCount((prev) => prev + 1)
  }, [])

usememo, use callback toi uu fuction
usememo tra lai value, usecallback tra lai callback

-- class
function component, class component

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            show: true
        }
    }
}

-- lifecycle: quan li 
//1.componentWillMount (first-render)
//2.componentDidMount (first-render)

//3.componentWillUnmount (clean update function)

//4.componentWillUpdate (first-render)
//5.componentDidUpdate (first-render)

-- useContext: giam thoi gian code, hieu qua bao tri
const countContext = createContext()
const [count, setCount] = useState(20)
const handleIncrease = () => {
    setCount((prev) => prev + 1)
}

return (
    <CountContext.Provider value={{count, handleIncrease}}>
        <Component1 />
    </CountContext.Provider>
)

->
const {count, handleIncrease} = useContext(countContext)
return (
    <h1>{count}</h1>
    <button onClick={handleIncrease}>Increase</button>
)

-- useReducer
// giong useState, khac la function reducer thay doi state
// uu diem la co the xu ly them logic -> code nhieu ben trong nen dung useReducer
const ACTIONS = {
    INCREASE_ABC: "INCREASE_ABC",
    DECREASE: "DECREASE",
}
const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.INCREASE_ABC: {
            return {count: state.count + action.payload}
        }
        case ACTIONS.DECREASE: {
            return {count: state.count - action.payload}
        }
        default:
            throw new Error
    }
    console.log({state, action})
}
const [state, dispatch] = useReducer(reducer, {count: 1})
const [num, setNum] = useState(0)

return (
    <h2>{state.count}</h2>
    <input value={num} onChange=((e) => setNum(+e.target.value))
    <button onClick={() => dispatch({type: ACTIONS.INCREASE_ABC, payload: num})}>Increase</button>
    <button onClick={() => dispatch({type: ACTIONS.DECREASE, payload: num})}>Decrease</button>
)

-- react-router-dom
//Link: khoong bi reload lai trang _> loi the hon (a href)
// target="_blank" mo ra tab moi
thu vien react router dom

return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={<Home />} />
            <Route path='/blog' Component={<Blog />} />
            <Route path='/profile' Component={<Profile />}/>
        </Routes>
    </BrowserRouter>
)
->componnents/Navigate.jsx
const Navigate = () => {
    const location = useLocation()
    const routes = [
        {
            href: "/",
            title: "Home",
        },
        {
            href: "/blog",
            title: "Blog",
        },
        {
            href: "/profile",
            title: "Profile",
        },
    ]
    return (
        <div style={backgroundColor: "yellow", fontSize="20px", color: "fff", display:"flex", gap:"8px", paddingTop: "8px", paddingBottom:"28px"}>
            //<Link to="/blog" target="_blank" style={{color: "#fff"}}>Blog</Link>
            //<Link to="/" style={{color: "#fff"}}>home</Link>
            //<Link to="/profile" style={{color: "#fff"}}>Profile</Link>

            {routes.map((item, index) => {
                return (
                    <Link 
                    key={index} 
                    to={item.href} 
                    style={{color: item.href === location.pathname ? "red" : "inherit"}}
                    >{item.title}
                    </Link>
                )
            })}
        </div>
    )
}
export default Navigate

->pages/Home.js
const Home = () => {
    const location = useLocation()
    console.log(location)
    return (
        <>
            <Navigate />
            <h1>Home</h1>
        </>
    )
}
export default Home

->pages/Blog.js
const Blog = () => {
    return (
        <>
            <Navigate />
            <h1>page Blog</h1>
            <button><Link to="/"></Link>Home</button>
        </>
    )
}
export default Blog

->pages/Profile.js
const Profile = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navigate />
            <h1>page Profile</h1>
            <button onClick=(() => {navigate("/", state: {name: "goHome"})})>Home</button>
        </>
    )
}
export default Profile

-- material UI
// cac component UI, template
MUI
https://mui.com/material-ui/react-button/


-- Error boundary 
if (count ===3 ) {
    throw new Error("loi")
}

-> ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError = {
                hasError: false
            }
        }
    }

    componentDidCatch(err, errorInfo) {
        this.setState({
            hasError: err
        })
        console.log("err, errorInfo")
    }

    render() {
        if(this.state.hasError) {
                return (
                    <h1>Error in server</h1>
                )
            }
        
        return this.props.children
    }
}
export default ErrorBoundary

-> index.js
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)

#2--- install
npm i sass

npm i react-router-dom

yarn add @mui/material @mui/styled-engine-sc styeld-components
yarn add @mui/icons-material
yarn install @fontsource/roboto
yarn add @mui/material @emotion/react @emotion/styled

#3--- generate


#4--- run
cd proj1_2
npx create-react-app create-react-tutorial

cd create-react-tutorial

-- neu can tao lai node module va packgaejson
npm install



#5--- ci/cd


#6--- docker


#7--- deploy