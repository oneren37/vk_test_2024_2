import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormItem, Input, Text } from "@vkontakte/vkui";
import {fetchAge} from "./api.ts";
import {useEffect, useState} from "react";
import {LoadingState} from "./types.ts";

const schema = yup.object().shape({
    name: yup.string().required("Обязательное поле").matches(/^[A-Za-z]+$/, "Только латинские буквы"),
});

const GetAge = () => {
  const [age, setAge] = useState<string>('')
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>|null>(null)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const watchName = watch("name")

  const fetchAgeValue = (name: string) => {
    setLoadingState('loading')
    fetchAge(name)
      .then(res => {
        setLoadingState('ok')
        setAge(res.age.toString())
      })
      .catch(err => {
        if (err.message === 'skipped') {
          setLoadingState('ok')
          return
        }
        setLoadingState('failed')
      });
  }

  useEffect(() => {
    schema.validate({ name: watchName })
      .then(() => {
        timeoutId && clearTimeout(timeoutId)
        setTimeoutId(setTimeout(() => {
          fetchAgeValue(watchName)
          timeoutId && clearTimeout(timeoutId)
        }, 3000))
      })
      .catch(() => {})
  }, [watchName])

  const onSubmit = (data: { name: string }) => {
      fetchAgeValue(data.name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormItem htmlFor="name" top="Имя" status={errors.name ? 'error' : 'default'} bottom={errors.name?.message}>
        <Input
            {...{
                ...register("name"),
                ref: null
            }}
            getRef={register("name").ref}
        />
      </FormItem>
      {loadingState !== 'idle' && (
        <FormItem>
        {loadingState === 'loading' && <Text>Загрузка ...</Text>}
        {loadingState === 'failed' && <Text>Произошла ошибка</Text>}
        {loadingState === 'ok' && <Text>{age}</Text>}
        </FormItem>
      )}

      <FormItem>
        <Button type="submit" size="l">
          Получить возраст
        </Button>
      </FormItem>
    </form>
  )
}

export default GetAge
