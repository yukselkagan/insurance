using Insurance.Dal.Abstract;
using Insurance.Entity.Dto;
using Insurance.Entity.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace Insurance.Dal.Concentre.Repository
{
    public class AgreementRepository : GenericRepository<Agreement>, IAgreementRepository
    {

        SqlConnection connection;

        public AgreementRepository(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("SqlServer");
            connection = new SqlConnection(connectionString);
        }

        public List<Agreement> GetAll()
        {

            ConnectionControl();

            SqlCommand command = new SqlCommand("SELECT * FROM Agreements " +
                "LEFT JOIN Persons ON Agreements.PersonId = Persons.PersonId " +
                "LEFT JOIN Policies ON Agreements.PolicyId = Policies.PolicyId", connection);

            List<Agreement> agreementList = new List<Agreement>();
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {

                Agreement newItem = new Agreement
                {
                    AgreementId = (int)reader["AgreementId"],
                    AgreementName = (string)reader["AgreementName"],
                    PolicyId = !DBNull.Value.Equals(reader["PolicyId"]) ? (int)reader["PolicyId"] : 0,
                    TotalPrice = !DBNull.Value.Equals(reader["TotalPrice"]) ? (double)reader["TotalPrice"] : 0,
                    Installment = !DBNull.Value.Equals(reader["Installment"]) ? (int)reader["Installment"] : 0,
                    StartDate = !DBNull.Value.Equals(reader["StartDate"]) ? Convert.ToDateTime(reader["StartDate"]) : null,
                    EndDate = !DBNull.Value.Equals(reader["EndDate"]) ? Convert.ToDateTime(reader["EndDate"]) : null,
                    Person = new Person
                    {
                        IdentityNumber = !DBNull.Value.Equals(reader["IdentityNumber"]) ? Convert.ToInt64(reader["IdentityNumber"]) : 0,
                        FirstName = Convert.ToString(reader["FirstName"]),
                        LastName = Convert.ToString(reader["LastName"]),
                        Gender = Convert.ToString(reader["Gender"]),
                        Birthday = !DBNull.Value.Equals(reader["Birthday"]) ? Convert.ToDateTime(reader["Birthday"]) : null,
                        PhoneNumber = Convert.ToString(reader["PhoneNumber"]),
                        Email = Convert.ToString(reader["Email"]),
                        Country = Convert.ToString(reader["Country"]),
                        Province = Convert.ToString(reader["Province"]),
                        District = Convert.ToString(reader["District"]),
                        Address = Convert.ToString(reader["Address"]),
                    }

                    
                };
                agreementList.Add(newItem);
                
            }

            reader.Close();
            connection.Close();



            return agreementList;

        }


        public Agreement Add(Agreement item)
        {
            ConnectionControl();
            int insertedPersonId = AddPersonSub(item.Person);
            double PolicyPrice = FindPolicyPrice(item.PolicyId);
            SqlCommand command = new SqlCommand("INSERT INTO Agreements (AgreementName,PolicyId,PersonId,StartDate,EndDate,TotalPrice,Installment) " +
                "values(@AgreementName,@PolicyId,@PersonId,@StartDate,@EndDate,@TotalPrice,@Installment)  ", connection);
            command.Parameters.AddWithValue("@AgreementName", item.AgreementName);
            command.Parameters.AddWithValue("@PersonId", insertedPersonId);
            command.Parameters.AddWithValue("@PolicyId", item.PolicyId);
            command.Parameters.AddWithValue("@StartDate", DateTime.Now);
            command.Parameters.AddWithValue("@EndDate", DateTime.Now.AddYears(1));
            command.Parameters.AddWithValue("@TotalPrice", PolicyPrice);
            command.Parameters.AddWithValue("@Installment", item.Installment);
            command.ExecuteNonQuery();

            connection.Close();

            return item;
        }




        public int AddPersonSub(Person item)
        {
            ConnectionControl();
            SqlCommand command = new SqlCommand("INSERT INTO Persons (IdentityNumber, FirstName, LastName, Gender, Birthday, PhoneNumber, Email, Country, Province, District, Address ) " +
                "OUTPUT INSERTED.PersonId  VALUES (@IdentityNumber, @FirstName, @LastName, @Gender, @Birthday, @PhoneNumber, @Email, @Country, @Province, @District, @Address) ", connection);
            command.Parameters.AddWithValue("@IdentityNumber", item.IdentityNumber);
            command.Parameters.AddWithValue("@FirstName", item.FirstName.ToLower());
            command.Parameters.AddWithValue("@LastName", item.LastName.ToLower());
            command.Parameters.AddWithValue("@Gender", item.Gender);
            command.Parameters.AddWithValue("@Birthday", item.Birthday);
            command.Parameters.AddWithValue("@PhoneNumber", item.PhoneNumber);
            command.Parameters.AddWithValue("@Email", item.Email);
            command.Parameters.AddWithValue("@Country", item.Country);
            command.Parameters.AddWithValue("@Province", item.Province);
            command.Parameters.AddWithValue("@District", item.District);
            command.Parameters.AddWithValue("@Address", item.Address);



            var lastInsertedId = (int)command.ExecuteScalar();
            return lastInsertedId;
        }

        public double FindPolicyPrice(int id)
        {
            SqlCommand commandSub = new SqlCommand("SELECT Price FROM Policies WHERE PolicyId=@PolicyId", connection);
            commandSub.Parameters.AddWithValue("@PolicyId", id);
            double PolicyPrice = Convert.ToDouble(commandSub.ExecuteScalar());
            return PolicyPrice;
        }


        public void ConnectionControl()
        {
            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
            }
        }






    }
}
