import React from 'react';

export const withGetOnScroll = (WrappedComponent) => {
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
            clearInterval(this.interval)
        }

        getOnScroll = () => {
            let check = setInterval(
                () => {
                        if (Math.ceil(this.props.currentPage * this.props.pageSize) > this.props.totalCount) {
                            clearInterval(check);
                            window.onscroll = null;
                        }
                        if (window.pageYOffset + 100 >= document.body.scrollHeight - window.innerHeight) this.onPageChange(this.props.currentPage + 1);
                        else clearInterval(check);
                }, 1000);
            this.interval = check;
            return window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;
                let maxScroll = document.body.scrollHeight - window.innerHeight;
                if (currentScrollPos + 100 >= maxScroll) this.onPageChange(this.props.currentPage + 1);
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
                this.setFetchingFalse()
            }
        }


        render() {
            return <WrappedComponent getOnScroll={this.getOnScroll} {...this.props} />
        }
    }
}

   
