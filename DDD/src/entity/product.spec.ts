import Product from "./product"

describe('Product unit test', () => {

    it('should throw error when id is empty', () => {
        expect(() => new Product("", "Product 1", 100)).toThrowError("Id is required");
    })

    it('should throw error when name is empty', () => {
        expect(() => new Product("123", "", 100)).toThrowError("Name is required");
    })

    it('should throw error when price need to be greater than 0 and not null', () => {
        expect(() => new Product("123", "Product 1", -10)).toThrowError("Price need to be greater than 0 and not null");
    })

    it('should change name', () => {
        const product = new Product("123", "Product 1", 100);

        expect(product.name).toBe("Product 1");

        // product.name = "Product 2";
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");

    })

    it('should change price', () => {
        const product = new Product("123", "Product 1", 100);

        expect(product.price).toBe(100);

        // product.name = "Product 2";
        product.changePrice(230);

        expect(product.price).toBe(230);
    })

})