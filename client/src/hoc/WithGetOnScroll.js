import React from 'react';

export const WithGetOnScroll = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {fetching: false}
        }

        setFetchingTrue = () => {
            this.setState({fetching: true})
        }

        setFetchingFalse = () => {
            this.setState({fetching: false})
        }
        
        componentWillUnmount() {
            window.onscroll = null
            this.props.setCurrentPage(1);
            clearInterval(this.state.interval)
        }

        getOnScroll = () => {
            let check = setInterval(
                () => {
                        if (this.state.unmounting) clearInterval(check)
                        if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalCount) {
                            clearInterval(check);
                            window.onscroll = null;
                        }
                        if (window.pageYOffset + 15 >= document.body.scrollHeight - window.innerHeight) this.onPageChange(this.props.currentPage + 1);
                        else clearInterval(check);
                }, 1000);
            this.setState({interval: check})
    
            return window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;
                let maxScroll = document.body.scrollHeight - window.innerHeight;
                if (currentScrollPos + 15 >= maxScroll) this.onPageChange(this.props.currentPage + 1);
                if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalCount) {
                    window.onscroll = null;
                }
            }
        }

        onPageChange = async(pageNumber) => {
            if(!this.state.fetching) {
                this.props.setCurrentPage(pageNumber);
                this.setFetchingTrue()
                await this.props.request(pageNumber, this.props.pageSize, this.props.searchName, this.props.ownerId)
                .then(res => this.setFetchingFalse())
            }
        }


        render() {
            return <WrappedComponent getOnScroll={this.getOnScroll} {...this.props} />
        }
    }
}

   
