import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../store";

class Season extends React.Component {
    componentDidMount( ) {
        if ( this.props.circuits.length <= 0 ) {
            console.log('componentDidMount',this.props)
            this.props.fetchData( );
        }
    }

    render( ) {
        const { circuits } = this.props;

        return (
            <div>
                <h2>F1 2018 Season Calendar</h2>
                <ul>
                    { circuits.map( ( { circuitId, circuitName, Location } ) => (
                        <li key={ circuitId } >
                            { circuitName } - { Location.locality }, { Location.country }
                        </li>
                    ) ) }
                </ul>
            </div>
        );
    }
}
//Season.serverFetch = fetchData; // static declaration of data requirements

const mapStateToProps = ( state ) => ( {
    circuits: state.data,
} );

const mapDispatchToProps = {
    fetchData,
};

export default connect( mapStateToProps, mapDispatchToProps )( Season );
