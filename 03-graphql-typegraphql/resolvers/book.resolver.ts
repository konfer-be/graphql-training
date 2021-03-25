import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Book } from './../models/book.model';
import { CreateBookInput } from './../inputs/create-book.input';
import { UpdateBookInput } from './../inputs/update-book.input';

@Resolver()
export class BookResolver {
    @Query(() => String)
    hello() {
        return 'World';
    }

    @Query(() => Book)
    getBook(@Arg("id") id: number) {
        return Book.findOne(id);
    }

    @Query(() => [Book])
    getBooks() {
        return Book.find();
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const book = Book.create(data);
        await Book.save(book);
        return book;
    }

    @Mutation(() => Book)
    async updateBook(@Arg("id") id: number, @Arg("data") data: UpdateBookInput) {
        const book = await Book.findOne(id);
        if (!book) {
            throw new Error('Book not found');
        }
        const saved = Book.merge(book, data);
        await Book.save(saved);
        return saved;
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg("id") id: number) {
        const book = await Book.findOne(id);
        if (!book) {
            throw new Error('Book not found');
        }
        await Book.remove(book);
        return true;
    }
}