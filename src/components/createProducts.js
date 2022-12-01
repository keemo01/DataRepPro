import React, { Component } from 'react';
import axios from 'axios';

// create class CreateProduct
class CreateProduct extends Component {
    constructor() {
        super();
        // bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductQty = this.onChangeProductQty.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.state = {
            Name: '',
            Qty: '',
            Image: ''
        }
    }

    // When a form is submitted, this method is called, and an alert with information is displayed on the screen.
    handleSubmit(event) {
        alert("Product Name: " + this.state.Name + "\nQuantity: " + this.state.Qty + "\nImage Url: " + this.state.Image);
        event.preventDefault(); // prevent crashing

        // create newProduct object
        const newProduct = {
            name: this.state.Name,
            qty: this.state.Qty,
            image: this.state.Image
        }
        axios.post('http://localhost:4000/api/products', newProduct) // send newProduct object to server
            .then((res) => {
                console.log(res); // response to console
            })
            .catch((err) => {
                console.log(err); // error to console
            });
        // set state to empty for another product
        this.setState({
            Name: '',
            Qty: '',
            Image: ''
        })
    }

    // will change name value in state when input changed
    onChangeProductName(event) {
        this.setState({
            Name: event.target.value
        })
    }

    // will set qty value in state when input changed
    onChangeProductQty(event) {
        this.setState({
            Qty: event.target.value
        })
    }

    // will set image url value in state when input changed
    onChangeProductImage(event) {
        this.setState({
            Image: event.target.value
        })
    }

    render() {
        return (
            <div className="form">
                <h2 className="header">Fill in product details to add into database</h2>
                <div className="form-container">
                    {/* create form */}
                    <form onSubmit={this.handleSubmit}>
                        {/* input name */}
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Add Product Name: </label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.Name}
                                    onChange={this.onChangeProductName}
                                />
                            </div>
                        </div>
                        {/* input qty */}
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Add Quantity: </label>
                            </div>
                            <div className="col-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.Qty}
                                    onChange={this.onChangeProductQty}
                                />
                            </div>
                        </div>
                        {/* input image url */}
                        <div className="row form-group">
                            <div className="col-3">
                                <label>Add Image Url: </label>
                            </div>
                            <div className="col-9">
                                <textarea type="text"
                                    className="form-control"
                                    value={this.state.Image}
                                    onChange={this.onChangeProductImage}
                                />
                            </div>
                        </div>
                        {/* add submit button */}
                        <div class="submit">
                            <input type="submit" value="Add Product" className="btn btn-primary"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateProduct; // export