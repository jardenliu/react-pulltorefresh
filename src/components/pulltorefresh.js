import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'loadsh'
import BetterScroll from 'better-scroll'
import '../styles/pulltorefresh.styl'

class PullToRefresh extends Component {
    static defaultProps = {
        disabled: false,
        onRefresh: () => { },
        distanceToRefresh: 75
    }

    static propTypes = {
        distanceToRefresh: PropTypes.number,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        onRefresh: PropTypes.func
    }

    constructor(props) {
        super(props)
        this._wrapper = null
        this.wrapperId = uniqueId('ptr')
        this.state = {
            beforePullDown: true,
            isPullingDown: false,
            ptrHeader: {
                top: `-${props.distanceToRefresh}px`
            }
        }
    }

    componentDidMount() {
        if (!this.props.disabled) this.initPullToRefresh()
    }

    componentDidUpdate(preProps) {
        // const disabledToEnabled = preProps.disabled && !this.props.disabled
        // const enabledToDisabled = !preProps.disabled && this.props.disabled

        // if (disabledToEnabled) this.initPullToRefresh()
        // if (enabledToDisabled) this.$instance.destroy()
    }

    componentWillUnmount() {
        this._wrapper = null
        this.$ptr.destroy() // destroy instance
    }

    initPullToRefresh() {
        this._wrapper = document.querySelector(`#${this.wrapperId}`)
        this.$ptr = new BetterScroll(this._wrapper, {
            pullDownRefresh: {
                threshold: 75,
                stop: 75
            }
        })

        this.$ptr.on('scroll', (pos) => {
            this.setState({
                beforePullDown: pos.y < this.props.distanceToRefresh,
                ptrHeader: {
                    top: `${pos.y - this.props.distanceToRefresh}px`
                }
            })
        })


        this.$ptr.on('pullingDown', () => {
            this.setState({ isPullingDown: true })
            setTimeout(() => {
                this.$ptr.finishPullDown()
                this.setState({ beforePullDown: true, isPullingDown: false })
            }, 3000)
        })
    }

    render() {
        const text = this.state.isPullingDown ? '正在刷新...' : this.state.beforePullDown ? '下拉刷新...' : '释放刷新...'
        const ptrSlot = this.props.ptr || (<div>{text}</div>);
        return <div className={`ptr-wrapper ` + this.props.className} style={this.props.style} id={this.wrapperId}>
            <div className={`ptr-content`}>
                <div>
                    {this.props.children}
                </div>
            </div>
            <div style={this.state.ptrHeader} className={`ptr-header ${this.state.isPullingDown ? 'pulling-down' : ''}`} >
                {ptrSlot}
            </div>
        </div>
    }

}

export default PullToRefresh