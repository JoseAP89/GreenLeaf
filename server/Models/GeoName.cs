using System;

namespace server.Models
{
    
    public class GeoName: IEquatable<GeoName>
    {
        public string ToponymName { get; set; }
        public string AdminName1 { get; set; }
        public string CountryName { get; set; }

        public bool Equals(GeoName other)
        {

            //Check whether the compared object is null.
            if (Object.ReferenceEquals(other, null)) return false;

            //Check whether the compared object references the same data.
            if (Object.ReferenceEquals(this, other)) return true;

            //Check whether the products' properties are equal.
            return ToponymName.Equals(other.ToponymName) && 
                AdminName1.Equals(other.AdminName1) &&
                CountryName.Equals(other.CountryName);
        }
        public override int GetHashCode()
        {

            //Get hash code for the ToponymName field if it is not null.
            int hashToponymName = ToponymName == null ? 0 : ToponymName.GetHashCode();
            //Get hash code for the AdminName1 field.
            int hashAdminName1 = AdminName1 == null ? 0 : AdminName1.GetHashCode();
            //Get hash code for the CountryName field.
            int hashCountryName = CountryName == null ? 0 : CountryName.GetHashCode();

            //Calculate the hash code for the GeoName.
            return hashToponymName ^ hashAdminName1 ^ hashCountryName;
        }

    }	

}