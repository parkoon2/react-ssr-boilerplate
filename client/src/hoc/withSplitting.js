import React, { Component } from 'react'

const withSplitting = getCompnent => {

    class WithSplitting extends Component {

        constructor(props) {
            super(props)
            getCompnent().then(({ default: Splitted }) => {
                this.setState({
                    Splitted
                })
            })
        }

        state = {
            Splitted: null
        }

        render() {
            const { Splitted } = this.state
            if (!Splitted) return null
            return <Splitted {...this.props} />
        }
    }

    return WithSplitting
}

export default withSplitting