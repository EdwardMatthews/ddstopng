export async function generateMetadata() {
    return {
        title: 'Recommendations',
        description: 'Recommendations for tools and resources',
        alternates: {
            canonical: '/r'
        }
    }
}

export default function R() {
    return (
        <div>
            <a href="https://gist.github.com/EdwardMatthews/53af73b9bd7963e344fae2de3e7aaf84">Gist Tool Recommendations</a>
            <br />
            <a href="https://feetgenerator.net/">Feet Generator</a>
            <br />
            <a href="https://cal.com/matthews-edward-qf14b4">Calendar</a>
            <br />
            <a href="https://www.creem.io/bip/edward">Creem</a>
        </div>
    );
}
  