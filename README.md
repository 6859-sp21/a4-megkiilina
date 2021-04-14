# a4-megkiilina
a4-megkiilina created by GitHub Classroom
## See the site at https://6859-sp21.github.io/a4-megkiilina/

## Writeup:
Our group “megkiilina” created a visualization based on the Cross-country Historical Adoption of Technology (CHAT) dataset, found here with discussion here.
Note: our team was Kii Kang, Megan Prakash, and Elina Oikonomaki, but Kii and Megan are submitting separately from Elina. Kii and Megan’s version is at [index.html](https://6859-sp21.github.io/a4-megkiilina/), and Elina’s version will be at main:elina/index_elina.html, containing line graphs that she completed after Kii and Megan submitted.

### About the dataset
The dataset includes over 100 technologies in its collection, but many of the technologies have very sparse data across all the countries and years. We decided to focus on communications inventions because it seemed to follow naturally from thinking about worldwide adoption of technology, plus the data for 20th century communications inventions was some of the most dense available in the CHAT dataset.

### Choosing a narrative
When exploring the data in Tableau, we saw the expected trend of exponential technology usage over time as well as world superpowers such as the USA, China, and Russia gaining access the most rapidly. The CHAT dataset also includes population and GDP per country by year, so we experimented with relating those two metrics to the technology data. Through this we discovered that certain countries frequently have earlier access to new technology, disproportionate with their GDP and populations, and that this often relates to the countries’ manufacturing and other comparative advantages. We chose to explore this theme as our overarching narrative.

For our visualization, we decided that technology vs. GDP was more compelling than vs. population, since population does not directly affect the rate at which a country can acquire new technology. We also decided to include the absolute quantities of technology in our visualization, since it is a simple mental model and is necessary to see other parts of our narrative. To present this information, we believed that a map was the strongest way to visualize information by country and keep it easily comprehensible by a user. However, since maps have a poor affordance for comparing quantitative encodings, we intended to also include line graphs for selected countries’ tech usage. (see note above)

### Interactions
Our webpage is divided into two columns, left containing a continuous stream of contents that reacts to the scroll, and the right containing an interactive world map. A row of sections on the left column denotes the sequence in which we wanted to show the technology, and the map is updated accordingly as you scroll down. Each country on the map is color encoded based on the data of the technology and the year of interest. The exact numbers of the data and the name of the countries are presented as a tooltip as you hover over the country, while fading the rest of the countries. Also, the toggle button on top of the color legend allows the viewers to switch between the number of technology users and the ratio of the technology to GDP to show the discrepancies between the growth in GDP and the distribution of technology.

### Work Distribution
Kii - Web design/development, map development, interaction design/development
Megan - Web design/development, content curation, data exploration
Elina* - Graph design/development

We chose the dataset, ideated, and discussed the site design as a group, which took about 4 hours total including our individual work time. Then, we split up to do the development work and each chose sections to implement. Our development work was done as above, and took about 20 hours each. The aspect that took the most time was learning to work with D3 and constructing our visualizations -- it surprised us how long it took to deal with bugs and how to get everything to draw correctly when we were creating our customized designs. This time factor combined with our respective intense workloads was the most difficult part of completing this assignment.
