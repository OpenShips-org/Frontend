import NavBar from "@/components/navbar/navbar";

export default function About() {
    return (
        <div>
            <NavBar />
            <div className="mt-20 flex h-full flex-col items-center justify-center py-2">
                <h1 className="mb-4 text-4xl font-bold">About Us</h1>
                <p className="max-w-2xl text-center text-lg">
                    Welcome to our website! We are dedicated to providing you
                    with the best experience possible. Our team is passionate
                    about delivering high-quality content and services to our
                    users. Thank you for visiting us!
                </p>
            </div>
        </div>
    );
}
