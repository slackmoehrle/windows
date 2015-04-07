rm -rf all.tar.gz
tar -czf all.tar.gz  views public
scp -r all.tar.gz root@vpn:~/win/

ssh -t  root@vpn "cd win/ && tar -zvxf all.tar.gz"
rm -rf all.tar.gz

# - id: 4
#   key: digibyte
#   code: dgb
#   symbol: "฿"
#   coin: true
#   quick_withdraw_max: 0
#   rpc: http://digibyterpc:8Z2KmkqCRhbMAyqh8hHjnJcRiif8fvjE9Me3jPvJx9MJ@127.0.0.1:18334
#   blockchain: https://digiexplorer.info/tx/#{txid}
#   address_url: https://digiexplorer.info/address/#{address}
#   assets:
#     accounts:
#       -
#         address: DQ3qaKkBAT3hFwGq9WTSxUNfuokAD5LMxa
