let input = document.querySelector('input');
let button = document.querySelector('button');
let wrapper = document.querySelector('.wrapper');

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        ReadFunction(data.country); 
        console.log(data.country)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const ReadFunction = (countries) => {
    wrapper.innerHTML = '';
    countries.map((v) => {
        let div = document.createElement('div');
        div.classList.add('shadow-lg', 'rounded-[20px]', 'py-[20px]', 'px-[20px]', 'flex', 'flex-col', 'items-center', 'justify-between', 'h-[350px]', 'bg-[grey]')
        div.innerHTML = `
        <div>
            <img src="https://flagcdn.com/w320/${v.country_id.toLowerCase()}.png" alt="">
        </div>
        <div>
            <p>Country: ${v.country_id}</p>
            <p>Probability: ${Math.ceil(v.probability * 100)}%</p>
        </div>
        `;
        wrapper.appendChild(div);
    });
};

button.addEventListener('click', () => {
    console.clear();
    fetchData(`https://api.nationalize.io/?name=${input.value}`)
    ReadFunction()
});

