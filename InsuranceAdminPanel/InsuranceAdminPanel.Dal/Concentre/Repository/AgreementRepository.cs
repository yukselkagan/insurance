using InsuranceAdminPanel.Dal.Abstract;
using InsuranceAdminPanel.Entity.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace InsuranceAdminPanel.Dal.Concentre.Repository
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




        public void ConnectionControl()
        {
            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
            }
        }


    }
}
