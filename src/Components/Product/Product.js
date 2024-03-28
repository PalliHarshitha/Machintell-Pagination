import React, { useState } from "react";
import styles from "./product.module.css";
import AddNewProduct from "./newProduct/AddNewProduct";
import SubAssembly from "./subAssembly/subAssembly";
import EditProduct from "./editProduct/editProduct";
import AddComponents from "./components/AddComponents";
import Tree from "./tree/tree";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store";
import ProductDetails from "./newProduct/ProductDetails";
import MainAssemblies from "./subAssembly/Mainassemblies";

const Product = () => {
    const [resetSubassembly, setResetSubassembly] = useState(false);
    const { name, id, currActive, subassemblies, currForm } = useSelector(
        (state) => state.product
    );
    const dispatch = useDispatch();

    let isDisabled = true;
    if (currActive) {
        if (currActive.startsWith("p")) isDisabled = false;
        else {
            isDisabled = !subassemblies[currActive].addChildren;
        }
    }

    function toggleFormDisplay(formType) {
        dispatch(productActions.setCurrForm(formType));
        if (formType === "newProduct" && id) {
            //send the product tree details to the backend
            dispatch(productActions.reset());
            dispatch(productActions.setCurrForm("newProduct"));
        }
        if (formType === "subAssembly") {
            setResetSubassembly((prevState) => !prevState);
        }
    }

    function displayForm() {
        if (currForm === "newProduct") return <AddNewProduct />;
        else if (currForm === "editProduct") return <EditProduct />;
        else if (currForm === "subAssembly")
            return <SubAssembly key={resetSubassembly} />;
        else if (currForm === "components" || currActive.startsWith("c"))
            return <AddComponents />;
        else if (currForm === "productDetails") return <ProductDetails />;
        // else if (currForm === "mainAssemblies") return <SubAssembly />;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftbox}>
                    <div className={styles.buttons}>
                        <button
                            type="button"
                            className={`${styles.btn} ${
                                currForm === "newProduct" && styles.active
                            }`}
                            onClick={() => {
                                toggleFormDisplay("newProduct");
                            }}
                        >
                            Add new product
                        </button>
                        <button
                            type="button"
                            className={`${styles.btn} ${
                                currForm === "editProduct" && styles.active
                            }`}
                            onClick={() => {
                                toggleFormDisplay("editProduct");
                            }}
                        >
                            Edit product
                        </button>
                    </div>
                    <div className={styles.columnTitle}>Product Details</div>
                </div>
                <div className={styles.middlebox}>
                    <div className={styles.buttons}>
                        <button
                            type="button"
                            className={`${styles.btn} ${
                                currForm === "subAssembly" && styles.active
                            }`}
                            onClick={() => {
                                toggleFormDisplay("subAssembly");
                            }}
                            disabled={isDisabled}
                        >
                            Add sub-assembly
                        </button>
                        <button
                            type="button"
                            className={`${styles.btn} ${
                                currForm === "components" && styles.active
                            }`}
                            onClick={() => {
                                toggleFormDisplay("components");
                            }}
                            disabled={isDisabled}
                        >
                            Add component
                        </button>
                    </div>
                    <div className={styles.columnTitle}>Main Assemblies</div>
                </div>
                <div className={styles.rightbox}>
                    <div></div>
                    <div className={styles.columnTitle}>View</div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.col}>
                    <div className={styles.leftcol}>
                        <div className={styles.leftcolTitle}>
                            {name && <Tree />}
                        </div>
                    </div>
                    <div className={styles.rightcol}>
                        <div>{displayForm()}</div>
                        <div>
                            {/* {id && currActive === id && <ProductDetails />} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
