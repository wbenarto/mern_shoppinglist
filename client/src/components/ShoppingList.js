import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';


class ShoppingList extends Component {
    componentDidMouint() {
        this.props.getItems();
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container className='' variant="primary">
                <Button color='dark' style={{marginBottom: '2rem'}} onClick={
                    () => {
                        const name = prompt('Enter Item');
                        if(name) {
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name}]
                            }))
                        }
                    }
                }>Add Item</Button>

                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} className='fade'>
                                <ListGroupItem>
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={() => {
                                        this.setState(state => ({
                                            items: state.items.filter(item => item._id !== _id)
                                        }));
                                    }}>&times;</Button>
                                    Item: {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        ) 
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired, 
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems })(ShoppingList);