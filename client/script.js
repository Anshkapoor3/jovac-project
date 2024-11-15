let locationsData = [];

// Extended CSV data embedded as a string (adding more data)
const csvData = `
location,size,total_squarefeet,no_of_bathrooms,price
Indira Nagar,3 BHK,2850,3,300
Jayanagar,2 BHK,1750,2,200
Whitefield,3 BHK,3400,4,350
Koramangala,2 BHK,1900,2,250
Marathahalli,3 BHK,2600,3,270
Electronic City,2 BHK,1200,2,150
Banashankari,3 BHK,2400,3,280
Hebbal,4 BHK,3500,4,400
Yelahanka,3 BHK,2800,3,310
HSR Layout,2 BHK,1850,2,220
RT Nagar,3 BHK,2750,3,290
Bellandur,2 BHK,1500,2,180
Sarjapur,3 BHK,3200,3,330
Malleshwaram,4 BHK,3900,4,450
Frazer Town,3 BHK,2650,3,310
Domlur,2 BHK,1900,2,230
MG Road,3 BHK,3000,3,350
Kalena Agrahara,2 BHK,1150,2.0,40.0
Cholanayakanahalli,3 BHK,2511,3.0,205.0
Kaval Byrasandra,2 BHK,460,1.0,22.0
ISRO Layout,6 Bedroom,4400,6.0,250.0
Kodanda Reddy Layout,3 BHK,1660,2.0,105.0
Yelahanka,2 BHK,1326,2.0,78.0
Garudachar Palya,3 BHK,1325,2.0,60.8
EPIP Zone,3 BHK,1499,5.0,102.0
Hegde Nagar,6 Bedroom,3000,7.0,210.0
Kanakpura Road,3 BHK,1665,3.0,88.0
`;

// Function to parse the embedded CSV data
function parseCSVData() {
    Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            locationsData = results.data;
            console.log("CSV data parsed successfully:", locationsData);
        },
        error: function(err) {
            console.error("Error parsing CSV data:", err);
        }
    });
}

// Call the function to parse CSV data on page load
parseCSVData();

// Function to estimate the price based on location, area, and number of bathrooms
document.getElementById('estimateBtn').addEventListener('click', function () {
    const inputLocation = document.getElementById('location').value.trim().toLowerCase();
    const inputArea = parseFloat(document.getElementById('area').value);
    const inputBathrooms = parseInt(document.getElementById('bathrooms').value);

    if (!inputLocation || isNaN(inputArea) || isNaN(inputBathrooms)) {
        alert("Please fill in all the fields.");
        return;
    }

    // Filter the data to match the input location
    const matchedData = locationsData.filter(row => row.location.toLowerCase() === inputLocation);

    if (matchedData.length > 0) {
        // Assuming 'price', 'total_squarefeet', and 'no_of_bathrooms' columns exist in the CSV data
        const matchingEntry = matchedData.find(row => row.total_squarefeet >= inputArea && row.no_of_bathrooms === inputBathrooms);

        if (matchingEntry) {
            // Calculate price using proportionality of area and bathrooms
            const pricePerSqft = matchingEntry.price / matchingEntry.total_squarefeet;
            const estimatedPrice = pricePerSqft * inputArea;
            document.getElementById('price').innerText = estimatedPrice.toFixed(2) + " LAKHS";
        } else {
            alert("No matching data found for the given area and number of bathrooms.");
            document.getElementById('price').innerText = "--";
        }
    } else {
        alert("Location not found. Please enter a valid location.");
        document.getElementById('price').innerText = "--";
    }
});