import React, { Component } from 'react'
import { Datatable } from '../../components'


export default class PrintTable extends Component {
    static propTypes = {
        columns: [],
        data: []
    }
    render() {
        return <Datatable paging={false} searching={false} columns={this.props.columns} data={this.props.data} />
    }
}
