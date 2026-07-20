import { memo } from "react"

import { Component } from "react";

// const Content = ({count, handleIncrease}) => {
//     return (
//         <>
//             <h1>Count: {count}</h1>
//             <button onClick={handleIncrease}>Increase</button>
//         </>
//     )
// }

// export default memo(Content)

class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            show: true
        }
    }

    componentWillUnmount() {
        alert("component will unmount")
    }


    render() {
        return <h1>Halo</h1>
    }
}

//1.componentWillMount (first-render)
//2.componentDidMount (first-render)

//3.componentWillUnmount (clean update function)

//4.componentWillUpdate (first-render)
//5.componentDidUpdate (first-render)

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            show: true
        }
    }

    
    //first render
    componentDidMount() {
        console.log("3. component did mount")
    }

    //first render
    componentWillMount() {
        console.log("1. component will mount")
    }

    shouldComponentUpdate() {
        // return true // cap nhat binh thuowng khi state thay doi
        return false    // k cho re-render khi state thay doi
    }

    // re-render
    componentWillUpdate() {
        console.log("1. component will update")
    }

    

    // re-render
    componentDidUpdate() {
        console.log("2. component did update")
    }

    handleIncrease = () => {
            // this.setState({
            //     count: this.state.count + 1
            // })

            this.setState((prev) => ({
                count: prev.count + 1,
                show: !prev.show    
            }))
        }

    render() {
        console.log("2. component render")
    

        // const {count, handleIncrease} = this.props

        return (
        <>  
            {this.state.show && <Text />}
            <h1>Count: {this.count}</h1>
            <button onClick={this.handleIncrease}>Increase</button>
        </>
    )
    }

}
export default memo(Content)