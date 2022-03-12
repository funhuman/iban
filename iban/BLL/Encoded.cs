using System;
using System.Security.Cryptography;
using System.Text;

namespace BLL
{
    /// <summary>
    /// 加密类（BLL辅助类）
    /// </summary>
    public static class Encoded
    {
        /// <summary>
        /// 盐
        /// </summary>
        private const string SALT = "iban";

        /// <summary>
        /// 使用MD5加密密码
        /// </summary>
        /// <param name="str">需要加密的字符串</param>
        /// <param name="salt">盐</param>
        /// <returns>加密后的字符串</returns>
        public static string encoded(string password, string salt = SALT)
        {
            return MD5Hash(password + SALT);
        }

        /// <summary>
        /// 32位MD5加密
        /// </summary>
        /// <param name="input">输入</param>
        /// <returns>输出</returns>
        /// <code>using System.Security.Cryptography;</code>
        /// <summary>https://www.cnblogs.com/hnsongbiao/p/9054913.html</summary>
        /// <summary>MD5Hash("123456") = e10adc3949ba59abbe56e057f20f883e</summary>
        private static string md5Hash(string input)
        {
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        /// <summary>
        /// 32位MD5加密
        /// </summary>
        /// <param name="input">输入</param>
        /// <returns>输出</returns>
        /// <code>using System.Security.Cryptography;</code>
        /// <summary>https://www.cnblogs.com/hnsongbiao/p/9054913.html</summary>
        /// <summary>MD5Hash("123456") = E10ADC3949BA59ABBE56E057F20F883E</summary>
        private static string MD5Hash(string input)
        {
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("X2"));
            }
            return sBuilder.ToString();
        }
    }
}
