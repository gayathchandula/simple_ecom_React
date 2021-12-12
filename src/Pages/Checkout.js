import React, {Fragment, useEffect, useState} from 'react'
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const Checkout =() => {

    const [cart, setCart] = useState([])
    const [user, error] = useAuthState(auth);

    useEffect(() => {
        const currentUser = auth.currentUser
        if (currentUser) {
            const uid = currentUser.uid;
            db.collection("cart").where("userId", "==", uid)
                .onSnapshot((querySnapshot) => {
                    var p = [];
                    querySnapshot.forEach((doc) => {
                        p.push(doc.data());
                    });

                    setCart(p)
                });
        }
    }, [user]);

    function total() {
        let x = 0
        cart.map((i) => {
            x +=( i.price * i.quantity) + 300

        })
        return x
    }

    function subtotal() {
        let x = 0
        cart.map((i) => {
            x += i.price * i.quantity

        })
        return x
    }

    return(

    <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col md:w-full">
                <h2 className="mb-4 font-bold md:text-xl text-heading ">Shipping Address
                </h2>
                <form className="justify-center w-full mx-auto">
                    <div className="">
                        <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">First
                                    Name</label>
                                <input name="firstName" type="text" placeholder="First Name"
                                       className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                            </div>
                            <div className="w-full lg:w-1/2 ">
                                <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Last
                                    Name</label>
                                <input name="Last Name" type="text" placeholder="Last Name"
                                       className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Email"
                                       className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                <input name="Last Name" type="email" placeholder="Email"
                                       className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Address"
                                       className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                <textarea
    className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
    name="Address" cols="20" rows="4" placeholder="Address" required/>
                            </div>
                        </div>
                        <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="city"
                                       className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                <input name="city" type="text" placeholder="City"
                                       className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                            </div>
                            <div className="w-full lg:w-1/2 ">
                                <label htmlFor="postcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                    Postcode</label>
                                <input name="postcode" type="number" min="0" placeholder="Post Code"
                                       className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <label className="flex items-center text-sm group text-heading">
                                <input type="checkbox"
                                       className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"/>
                                    <span className="ml-2">Save this information for next time</span></label>
                        </div>
                        <div className="relative pt-3 xl:pt-6"><label htmlFor="note"
                                                                      className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                            (Optional)</label><textarea name="note"
    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
    rows="4" placeholder="Notes for delivery"/>
                        </div>
                        {cart ?(
                            <div className="mt-4">
                                <button
                                    className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Process
                                </button>
                            </div>
                        ):(
                            <div className="mt-4">
                                <button
                                    className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900 cursor-not-allowed">Process
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                <div className="pt-12 md:pt-0 2xl:ps-4">
                    <h2 className="text-xl font-bold">Order Summary
                    </h2>
                    <div className="mt-8">
                        <div className="flex flex-col space-y-4">
                            {cart.map((product) => (
                            <div key={product.id} className="flex space-x-4">
                                <div>
                                    <img src={product.imageSrc} alt="image"
                                         className="w-60"/>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <p className="text-sm">{product.quantity}</p>
                                    <span className="text-red-600">Price</span> LKR{product.price}
                                </div>

                            </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Subtotal<span className="ml-2">LKR {subtotal()}</span></div>
                    <div
                        className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Shipping Tax<span className="ml-2">LKR 10</span></div>
                    <div
                        className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Total<span className="ml-2">LKR {total()}</span></div>
                </div>
            </div>

        </div>
    </div>

    )
}

export default Checkout