package util

import (
	"github.com/spf13/viper"
)


//store all configuration of app
//values read by biper from a config file
type Config struct {
	
	//to unmarshall files, viper uses a map structure
	DBSource string `mapstructure:"DB_SOURCE"`
}

func LoadConfig (path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	//automatically read values if they exist in the file found above
	viper.AutomaticEnv()

	err = viper.ReadInConfig()

	if err != nil {
		return
	}

	//target the config object
	err = viper.Unmarshal(&config)
	return
}

