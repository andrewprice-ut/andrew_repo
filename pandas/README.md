

```python
import pandas as pd
import os
```


```python
data_1_df = pd.read_json("purchase_data.json", orient="columns")
data_2_df = pd.read_json ("purchase_data2.json", orient="columns")
```


```python
combine_df = pd.concat([data_1_df, data_2_df])
combine_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>38</td>
      <td>Male</td>
      <td>165</td>
      <td>Bone Crushing Silver Skewer</td>
      <td>3.37</td>
      <td>Aelalis34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>21</td>
      <td>Male</td>
      <td>119</td>
      <td>Stormbringer, Dark Blade of Ending Misery</td>
      <td>2.32</td>
      <td>Eolo46</td>
    </tr>
    <tr>
      <th>2</th>
      <td>34</td>
      <td>Male</td>
      <td>174</td>
      <td>Primitive Blade</td>
      <td>2.46</td>
      <td>Assastnya25</td>
    </tr>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>Male</td>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>Pheusrical25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>23</td>
      <td>Male</td>
      <td>63</td>
      <td>Stormfury Mace</td>
      <td>1.27</td>
      <td>Aela59</td>
    </tr>
  </tbody>
</table>
</div>



# Player Count


```python
total_players = combine_df["SN"].count()

# Creating a summary DataFrame using above values
summary_df = pd.DataFrame({"Total Players": [total_players]})

summary_df
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>858</td>
    </tr>
  </tbody>
</table>
</div>



# Purchasing Analysis (Total)


```python
unique_items = combine_df["Item Name"].nunique()
avg_price = combine_df["Price"].mean()
purchase_count = combine_df["Item Name"].count()
total_revenue = combine_df["Price"].sum()

# Creating a summary DataFrame using above values
purchaseanalysis_df = pd.DataFrame({"Number of Unique Items": [unique_items],
                          "Average Purchase Price": [avg_price],
                          "Total Number of Purchases": [purchase_count],
                          "Total Revenue": [total_revenue]})

purchaseanalysis_df
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Average Purchase Price</th>
      <th>Number of Unique Items</th>
      <th>Total Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2.930571</td>
      <td>180</td>
      <td>858</td>
      <td>2514.43</td>
    </tr>
  </tbody>
</table>
</div>



# Gender Demographics


```python
total_gender = combine_df["Gender"].count()
male = combine_df["Gender"].value_counts()['Male']
female = combine_df["Gender"].value_counts()['Female']
non_gender_specific = total_gender - male - female


male_percent = (male/total_gender) * 100
female_percent = (female/total_gender) * 100
non_gender_specific_percent = (non_gender_specific/total_gender) * 100

genderanalysis_df = pd.DataFrame({"Gender": ["Male", "Female", "Other"], "Percentage of Players": [male_percent, female_percent, non_gender_specific_percent],
                          "Total Count": [male, female, non_gender_specific]})
                          
genderanalysis_df.set_index("Gender", inplace=True)
genderanalysis_df
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>81.235431</td>
      <td>697</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>17.365967</td>
      <td>149</td>
    </tr>
    <tr>
      <th>Other</th>
      <td>1.398601</td>
      <td>12</td>
    </tr>
  </tbody>
</table>
</div>



# Purchasing Analysis (Gender)


```python
male_purchase = combine_df.loc[combine_df["Gender"] == "Male"]
male_purchase_count = male_purchase["Item Name"].count()
male_purchase_count

female_purchase = combine_df.loc[combine_df["Gender"] == "Female"]
female_purchase_count = female_purchase["Item Name"].count()
female_purchase_count

other_purchase = combine_df.loc[combine_df["Gender"] == "Other / Non-Disclosed"]
other_purchase_count = male_purchase_count - female_purchase_count

male_avg_price = male_purchase["Price"].mean()
female_avg_price = female_purchase["Price"].mean()
other_avg_price = other_purchase["Price"].mean()

male_total_revenue = male_purchase["Price"].sum()
female_total_revenue = female_purchase["Price"].sum()
other_total_revenue = other_purchase["Price"].sum()


genderpurchases_df = pd.DataFrame({"Gender": ["Male", "Female", "Other"], 
                                   "Purchase Count": [male_purchase_count, female_purchase_count, other_purchase_count],
                          "Average Purchase Price": [male_avg_price, female_avg_price, other_avg_price], 
                                   "Total Purchase Value": [male_total_revenue, female_total_revenue, other_total_revenue], 
                                   })
                          
genderpurchases_df.set_index("Gender", inplace=True)
genderpurchases_df
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Average Purchase Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>2.944448</td>
      <td>697</td>
      <td>2052.28</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>2.847584</td>
      <td>149</td>
      <td>424.29</td>
    </tr>
    <tr>
      <th>Other</th>
      <td>3.155000</td>
      <td>548</td>
      <td>37.86</td>
    </tr>
  </tbody>
</table>
</div>


