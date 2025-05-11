type GreetingHeaderProps = {
    firstName: string;
};

export default function GreetingHeader({ firstName } : GreetingHeaderProps){
    const greeting = getGreeting();

    return (
        <h2 className="text-lg text-gray-300 mb-4 mt-4">
            {greeting}, <span className="font-semibold text-white">{firstName}</span>
        </h2>
    )
}

function getGreeting() : string{
    const hour = new Date().getHours();

    if(hour < 12) return "Good Morning";
    if(hour < 18) return "Good afternoon";

    return "Good evening";
}